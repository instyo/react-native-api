import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Home from "./src/screens/HomeScreen";
import Profile from "./src/screens/ProfileScreen";
import Add from "./src/screens/AddScreen";
import AddCategory from "./src/screens/category/AddCategory";
import CategoryList from "./src/screens/category/CategoryList";
import AddArticle from "./src/screens/articles/AddArticle";
import ArticleList from "./src/screens/articles/ArticleList";
import SearchCategory from './src/screens/articles/SearchCategory'
import ArticleDetail from './src/screens/articles/ArticleDetail'

const Project = createStackNavigator({
  Home: {
    screen: Home
  },
  Profile: {
    screen: Profile
  },
  Add: {
    screen: Add
  },
  AddCategory: {
    screen: AddCategory
  },
  Categories: {
    screen: CategoryList
  },
  AddArticle: {
    screen: AddArticle
  },
  ArticleList: {
    screen: ArticleList
  },
  SearchCategory: {
    screen: SearchCategory
  },
  ArticleDetail: {
    screen: ArticleDetail
  }
},
  {
    initialRouteName: 'ArticleList',
  });
export default createAppContainer(Project);