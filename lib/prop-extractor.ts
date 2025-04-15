import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface ComponentPropsInfo {
  componentName: string;
  props: PropDefinition[];
}

export function extractPropsFromFile(filePath: string, componentName: string): ComponentPropsInfo {
  // Read the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Create a TypeScript source file
  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );
  
  const props: PropDefinition[] = [];
  
  // Find the interface for the component props
  function findPropsInterface(node: ts.Node) {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.getText(sourceFile).includes(`${componentName}Props`)
    ) {
      // Process each property in the interface
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText(sourceFile);
          let propType = member.type ? member.type.getText(sourceFile) : 'any';
          const required = !member.questionToken;
          
          // Extract JSDoc comments for description
          let description = '';
          const jsDocComment = getJSDocComment(member);
          if (jsDocComment) {
            description = jsDocComment;
          }
          
          props.push({
            name: propName,
            type: propType,
            required: required,
            description: description,
          });
        }
      });
    }
    
    // Find default values from the component function
    if (
      ts.isFunctionDeclaration(node) &&
      node.name?.getText(sourceFile) === componentName
    ) {
      extractDefaultValues(node);
    } else if (
      ts.isVariableStatement(node) &&
      node.declarationList.declarations.some(
        (decl) => decl.name.getText(sourceFile) === componentName
      )
    ) {
      const declaration = node.declarationList.declarations.find(
        (decl) => decl.name.getText(sourceFile) === componentName
      );
      
      if (declaration && declaration.initializer && ts.isArrowFunction(declaration.initializer)) {
        extractDefaultValues(declaration.initializer);
      }
    }
    
    ts.forEachChild(node, findPropsInterface);
  }
  
  function extractDefaultValues(node: ts.FunctionDeclaration | ts.ArrowFunction) {
    if (!node.parameters) return;
    
    node.parameters.forEach((param) => {
      // Look for destructuring patterns with default values
      if (param.name && ts.isObjectBindingPattern(param.name)) {
        param.name.elements.forEach((element) => {
          if (ts.isBindingElement(element) && element.initializer) {
            const propName = element.name.getText(sourceFile);
            const defaultValue = element.initializer.getText(sourceFile);
            
            // Update the existing prop with the default value
            const existingProp = props.find((p) => p.name === propName);
            if (existingProp) {
              existingProp.defaultValue = defaultValue;
            }
          }
        });
      }
    });
  }
  
  function getJSDocComment(node: ts.Node): string | undefined {
    const fullText = sourceFile.getFullText();
    const commentRanges = ts.getLeadingCommentRanges(fullText, node.pos);
    
    if (!commentRanges || commentRanges.length === 0) return undefined;
    
    // Get the last JSDoc comment
    const jsDocRange = commentRanges
      .filter((r) => fullText.substring(r.pos, r.end).startsWith('/**'))
      .pop();
    
    if (!jsDocRange) return undefined;
    
    const comment = fullText.substring(jsDocRange.pos, jsDocRange.end);
    
    // Extract the description from the comment (remove * and leading/trailing spaces)
    return comment
      .split('\n')
      .map((line) => line.replace(/^\s*\/\*\*|\s*\*\/|\s*\*\s?/g, ''))
      .filter(Boolean)
      .join(' ')
      .trim();
  }
  
  // Start processing the source file
  ts.forEachChild(sourceFile, findPropsInterface);
  
  return {
    componentName,
    props,
  };
}