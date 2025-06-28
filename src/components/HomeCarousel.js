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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Carousel
        indicators={false}
        controls={false}
        interval={2000}
        pause={false}
        style={{ height: "100%" }}
      >
        {data.map((value) => (
          <Carousel.Item key={value.id} style={{ height: "100%" }}>
            <img
              src={value.thumbnailUrl}
              alt="Trending Poster"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(30%)",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};


export default HomeCarousel;
