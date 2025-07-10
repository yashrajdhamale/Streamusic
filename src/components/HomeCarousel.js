import Carousel from "react-bootstrap/Carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HomeCarousel = () => {
  const fetchSongPoster = async () => {
    const res = await axios.get(
      // `${process.env.REACT_APP_BackEnd}/app/getTrendingSongsPoster`
      `https://streamusic-backend.onrender.com/app/getTrendingSongsPoster`
    );
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["poster"],
    queryFn: fetchSongPoster,
  });

  if (isLoading && !data) return null;
  if (error) return null;

  return (
    <div
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "30px",
        boxShadow: "0 8px 30px rgba(128, 0, 128, 0.5)", 
      }}
    >
      <Carousel
        indicators={false}
        controls={false}
        interval={2000}
        pause={false}
        style={{ height: "100%" }}
        sx={{ m: 3,p: 2}}
      >
        {data.map((value) => (
          <Carousel.Item key={value.id} style={{ height: "100%" , width: "100%"}}>
            <img
              src={value.thumbnailUrl}
              alt="Trending Poster"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
