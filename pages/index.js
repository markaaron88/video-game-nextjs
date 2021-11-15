import { gql, GraphQLClient } from "graphql-request";
import Link from "next/Link";
import Navbar from "../components/NavBar";
import Section from "../components/Section";
export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;
  const accountQuery = gql`
    query {
      account(where: { id: "ckvvouhjsaigl0b66ywiyy7go" }) {
        username
        avatar {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };
  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="all-videos">
          <Section
            genre={"Recommended for you"}
            videos={unSeenVideos(videos)}
          />
          <Section
            genre={"Battle royale"}
            videos={filterVideos(videos, "battle royale")}
          />
          <Section genre={"Shooter"} videos={filterVideos(videos, "shooter")} />
          <Section genre={"Sports"} videos={filterVideos(videos, "sports")} />
          <Section
            genre={"Action Role Playing"}
            videos={filterVideos(videos, "action role-playing")}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
