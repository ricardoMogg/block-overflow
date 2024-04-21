import HeaderContainer from "./components/Header/HeaderContainer";
import ContentContainer from "./components/Content/ContentContainer";
import HomeHeaderContent from "./components/Header/HomeHeaderContent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeaderContainer>
        <HomeHeaderContent />
      </HeaderContainer>
      <ContentContainer />
    </main>
  );
}
