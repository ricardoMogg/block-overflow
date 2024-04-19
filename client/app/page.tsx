import CreatePostButton from "./components/CreatePostButton";
import Posts from "./components/Posts";
import SignInButton from "./components/SignInButton";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
      <CreatePostButton />
      <Posts />
    </main>
  );
}
