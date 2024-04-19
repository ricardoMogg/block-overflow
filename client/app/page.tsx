import Posts from "./components/Posts";
import SignInButton from "./components/Header/SignInButton";
import HeaderContainer from "./components/Header/HeaderContainer";
import ContentContainer from "./components/Content/ContentContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderContainer />
      <ContentContainer />
    </main>
  );
}
