
import { getComponentList } from '@/lib/mdx-server';
import { componentsRegistry } from '@/lib/component-registry';
import { getComponentDemoOnly } from '@/lib/mdx-demo';
import Link from 'next/link';

export default async function ComponentsPage() {
  const components = await getComponentList();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 max-w-6xl mx-auto">
      {await Promise.all(
        components.map(async (component) => {
          const Demo = await getComponentDemoOnly(component.slug, componentsRegistry);

          return (
            <Link href={`/components/${component.slug}`} key={component.slug} className="relative flex flex-col justify-between border h-[20rem] rounded-xl p-4 shadow">
              <div className="demo-preview">{Demo}</div>
              <div className='relative'>
              <h3 className="text-lg font-semibold mb-2">{component.title}</h3>
              <p className='text-muted-foreground text-sm'>{component.description}</p>
              <div className='absolute text-xs px-2 py-1 flex items-center rounded-full bg-accent top-2 right-2'>
                {component.category??"Ui"}
              </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}