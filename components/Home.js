import { useRoute } from "@react-navigation/native";
import { PostsScreen } from "../Screens/PostsScreen";

export const Home = () => {
  const {
    params: { values },
    } = useRoute();
    
  return <PostsScreen values={values} />;
};
