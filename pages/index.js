import Head from "next/head";
import MongoClient from "mongodb/lib/mongo_client";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Find people in your next trip! Choose between a highly active meetups site"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://iron:IsA4Vk3FzsWB26Jn@nextcluster.lubge5m.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((item) => {
        return {
          title: item.title,
          address: item.address,
          image: item.image,
          id: item._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
