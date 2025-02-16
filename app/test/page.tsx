

export default function EmbedPage() {
  return (
    <div className="flex  flex-col items-center justify-center h-screen">
      {/* <h1 className="text-xl font-bold mb-4">Embedded Localhost:3000/9849b34f-2c44-4d66-bb89-843fa964e0b0</h1> */}
      <iframe
        src="http://localhost:3001/9849b34f-2c44-4d66-bb89-843fa964e0b0"
        width="100%"
        height="600px"
        className="border rounded-lg"
      />
    </div>
  );
}