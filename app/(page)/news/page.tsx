import NewsRoom from '@/components/home/NewsRoom';
import PageHeader from '@/components/ui/PageHeader';

const News = () => {
  return (
    <div>
      <PageHeader
        header="Newsroom"
        description="Announcements, launches and coverage of BBYDI's work. Looking for our research? Go to Publications."
        page="Newsroom"
      />
      <NewsRoom />
    </div>
  );
}

export default News;