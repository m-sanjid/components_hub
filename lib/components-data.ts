export type Component = {
  id: string;
  name: string;
  description: string;
  category: 'UI' | 'Layout' | 'Form' | 'Navigation' | 'Data Display' | 'Feedback';
  previewImage: string;
  isPremium: boolean;
  demoCode: string;
  usageCode: string;
  propsTable: {
    name: string;
    type: string;
    default: string;
    description: string;
  }[];
};

export const components: Component[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants and sizes.',
    category: 'UI',
    previewImage: '/components/button.png',
    isPremium: false,
    demoCode: `<Button variant="primary">Click me</Button>`,
    usageCode: `import { Button } from '@/components/ui/button';

export default function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`,
    propsTable: [
      {
        name: 'variant',
        type: 'string',
        default: 'default',
        description: 'Visual style of the button (default, primary, secondary, outline, ghost)'
      },
      {
        name: 'size',
        type: 'string',
        default: 'md',
        description: 'Size of the button (sm, md, lg)'
      }
    ]
  },
  {
    id: 'card',
    name: 'Card',
    description: 'A container for displaying content in a clear and concise format.',
    category: 'Layout',
    previewImage: '/components/card.png',
    isPremium: false,
    demoCode: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`,
    usageCode: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}`,
    propsTable: [
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Additional CSS classes to apply'
      }
    ]
  },
  {
    id: 'input',
    name: 'Input',
    description: 'A form input component with validation support.',
    category: 'Form',
    previewImage: '/components/input.png',
    isPremium: false,
    demoCode: `<Input placeholder="Enter your name" />`,
    usageCode: `import { Input } from '@/components/ui/input';

export default function MyComponent() {
  return (
    <Input placeholder="Enter your name" />
  );
}`,
    propsTable: [
      {
        name: 'type',
        type: 'string',
        default: 'text',
        description: 'Type of the input (text, password, email, etc.)'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '',
        description: 'Placeholder text'
      }
    ]
  },
  {
    id: 'dropdown',
    name: 'Dropdown Menu',
    description: 'A dropdown menu component with customizable items and submenus.',
    category: 'Navigation',
    previewImage: '/components/dropdown.png',
    isPremium: true,
    demoCode: `<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Item 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    usageCode: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    propsTable: [
      {
        name: 'open',
        type: 'boolean',
        default: 'undefined',
        description: 'Controlled open state'
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        default: 'false',
        description: 'Initial open state when uncontrolled'
      }
    ]
  },
  {
    id: 'table',
    name: 'Table',
    description: 'A responsive table component for displaying structured data.',
    category: 'Data Display',
    previewImage: '/components/table.png',
    isPremium: true,
    demoCode: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    usageCode: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export default function MyComponent() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    propsTable: [
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Additional CSS classes to apply'
      }
    ]
  }
];

export function getComponentBySlug(slug: string): Component | undefined {
  return components.find(component => component.id === slug);
}

export function getComponentsByCategory(category?: Component['category']) {
  if (!category) return components;
  return components.filter(component => component.category === category);
}

export const categories = [
  { id: 'all', name: 'All Components' },
  { id: 'UI', name: 'UI Components' },
  { id: 'Layout', name: 'Layout Components' },
  { id: 'Form', name: 'Form Components' },
  { id: 'Navigation', name: 'Navigation Components' },
  { id: 'Data Display', name: 'Data Display Components' },
  { id: 'Feedback', name: 'Feedback Components' }
];
