import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  if (await isAuthenticated()) {
    
    
  
    return (
    <section className="flex flex-col items-center justify-center bg-background h-[90vh] mt-40 ">
  <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
    <div className="max-w-3xl mx-auto text-center ">
      <div className="">
        <span className="w-auto px-6 py-3 rounded-full bg-secondary ">
          <span className="text-sm font-medium text-primary ">
            Byte Brigade is now numerique
          </span>
        </span>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
          Bienvenue au Club Byte Brigade
        </h1>
        <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
          Le club informatique de l&apos;ENSAS, où passion et technologie se rencontrent.
        </p>
      </div>

    </div>

    {/* === Transparent Cards Section === */}
    <div className="mt-40 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
      {/* Card 1 */}
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl text-center flex flex-col items-center shadow-lg">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold mb-2">Événements tech</h3>
        <p className="text-gray-900 text-muted-foreground mt-1">
          Hackathons, conférences et compétitions
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl text-center flex flex-col items-center shadow-lg">
        <div className="text-4xl mb-4">👥</div>
        <h3 className="text-xl font-semibold mb-2">Projets collaboratifs</h3>
        <p className="text-gray-900 text-muted-foreground mt-1">
          Créez des solutions innovantes en équipe
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl text-center flex flex-col items-center shadow-lg">
        <div className="text-4xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">Partage de connaissances</h3>
        <p className="text-gray-900 text-muted-foreground mt-1">
          Cours, tutoriels et ressources pour tous les niveaux
        </p>
      </div>
    </div>
  </div>
</section>

  );
  }
  return (
        <section className="flex flex-col items-center justify-center bg-background h-[90vh] mt-40 ">
  <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
    <div className="max-w-3xl mx-auto text-center ">
      <div className="">
        <span className="w-auto px-6 py-3 rounded-full bg-secondary ">
          <span className="text-sm font-medium text-primary ">
            Byte Brigade is now numerique
          </span>
        </span>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
          Bienvenue au Club Byte Brigade
        </h1>
        <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
          Le club informatique de l&apos;ENSAS, où passion et technologie se rencontrent.
        </p>
      </div>

      <div className="flex justify-center max-w-sm mx-auto mt-10">
        <RegisterLink>
          <Button size="lg" className="w-full">
            Sign Up for free
          </Button>
        </RegisterLink>
      </div>
    </div>

    {/* === Transparent Cards Section === */}
    <div className=" grid gap-8 sm:grid-cols-1 md:grid-cols-3 mt-20 ">
      {/* Card 1 */}
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl text-center flex flex-col items-center shadow-lg">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold mb-2">Événements tech</h3>
        <p className="text-gray-900 text-muted-foreground mt-1">
          Hackathons, conférences et compétitions
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl text-center flex flex-col items-center shadow-lg">
        <div className="text-4xl mb-4">👥</div>
        <h3 className="text-xl font-semibold mb-2">Projets collaboratifs</h3>
        <p className="text-gray-900 text-muted-foreground mt-1">
          Créez des solutions innovantes en équipe
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl text-center flex flex-col items-center shadow-lg">
        <div className="text-4xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">Partage de connaissances</h3>
        <p className="text-gray-900 text-muted-foreground mt-1">
          Cours, tutoriels et ressources pour tous les niveaux
        </p>
      </div>
    </div>
  </div>
</section>
  );
}
