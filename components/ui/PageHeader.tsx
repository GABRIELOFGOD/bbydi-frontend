import Link from 'next/link';
import Container from '../Container';

interface PageHeaderType {
  page: string;
  header: string;
  description?: string
}

const PageHeader = ({ page, header, description }: PageHeaderType) => {
  return (
    <div className="bg-muted w-full py-20 shadow-sm">
      <Container className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex gap-1 text-xs text-muted-foreground">
            <Link href="/">Home</Link>
            <span>/</span>
            <p>{page}</p>
          </div>

          <h1 className='text-4xl font-extrabold'>{header}</h1>

          <p className="text-black/70 text-lg">{description}</p>
        </div>
      </Container>
    </div>
  )
}

export default PageHeader;