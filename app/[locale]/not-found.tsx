export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = locale === "en" ? "/en" : "/es";

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {locale === "en" ? "Oops! Page not found" : "Ups. No encontramos esta página"}
        </p>
        <a href={home} className="text-primary underline hover:text-primary/90">
          {locale === "en" ? "Return to Home" : "Volver al inicio"}
        </a>
      </div>
    </div>
  );
}
