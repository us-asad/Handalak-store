import { ContainerBlockText } from 'subcomponents';
import HoveredBox from 'subcomponents/HoveredBox';

export default function BrandsContainer({ brands }) {
  return (
    <div>
      <ContainerBlockText name="Brendlar" destination="/" />
      <ul className='grid grid-rows-1 gap-x-2 gap-y-5 overflow-x-scroll md:overflow-x-hidden md:grid-cols-5 lg:grid-cols-7 grid-flow-col md:grid-flow-row md:gap-4 lg:gap-x-3 xl:gap-x-4 auto-cols-max md:auto-cols-min py-7 scrollbar-hidden'>
        {brands?.map(brand => (
          <li key={brand?.slug}>
            <HoveredBox
              height="92px"
              imgClassName="min-w-[45px] min-h-[45px] max-w-full"
              imageUrl={brand?.logo?.url}
              destination={`/brand/${brand?.slug}`}
              name={brand?.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
