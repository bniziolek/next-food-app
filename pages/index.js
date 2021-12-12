import MealList from "../components/MealList";
import { MongoClient } from "mongodb";
const HomePage = (props) => {
  return <MealList meals={props.mealList} />;
};
export async function getStaticProps() {
  const DATABASE_NAME = "myFirstDatabase";
  const DATABASE_PASSWORD = "Bnizi0207";

  const client = await MongoClient.connect(
    `mongodb+srv://bniziolek:${DATABASE_PASSWORD}@cluster0.ylfvd.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
);
  const db = client.db();
  const mealsCollection = db.collection("meals");
  const meals = await mealsCollection.find().toArray();

  client.close();

  return {
    props: {
      mealList: meals.map((meal) => ({
        id: meal._id.toString(),
        name: meal.name,
        image: meal.image_path,
        dish: meal.dishes,
        chef: meal.chef,
      })),
    },
  };
}
export default HomePage;