import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrlqClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {  
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>YOOO</div>
      {!data ? <div>Loadding ...</div> : data.posts.map(p => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

// set `ssr: true` to server side rendering index page
export default withUrqlClient(createUrlqClient, {ssr: true})(Index);
