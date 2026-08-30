import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";

const Partners = () => {
  return (
    <div className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-10">
        <SectionTitle title="Partners & supporters" className="text-center w-full" showLine={false}  />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white p-4 flex justify-center items-center border w-full h-20">
              <p>Partner {item}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Partners;