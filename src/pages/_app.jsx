import Header from "@/components/Header";
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <main className="flex flex-col">
      <Header />
      <section>
        <div className="mx-auto max-w-5xl p-4">
          <Component {...pageProps} />
        </div>
      </section>
    </main>
  );
}
