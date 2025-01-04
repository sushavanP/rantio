import "./App.css";
import { Textarea } from "./components/ui/textarea";
import { CardHeader, Card, CardTitle, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { useSupabase } from "./Supabase/SupabaseHook";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Draggable from "react-draggable";
import { generateUsername } from "unique-username-generator";

interface Rant {
  id: number;
  rant: string;
  user: string;
  country: string;
  created_at: Date;
}

function App() {
  const supabase = useSupabase();
  const [rants, setRants] = useState<Rant[]>([]);
  const [typedRant, setTypedRant] = useState<string>("");
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchRants = async () => {
      const { data, error } = await supabase
        .from("rants")
        .select()
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching rants: ", error);
      else setRants(data);
    };

    fetchRants();
  }, [supabase]);

  async function saveRants() {
    if (typedRant) {
      const rantToSave = {
        id: rants.length + 1,
        rant: typedRant,
        user: generateUsername("-", 2, 13),
        country: "India",
        created_at: new Date(),
      };
      const allRants = [rantToSave, ...rants];

      const { error } = await supabase
        .from("rants")
        .insert([rantToSave])
        .select();

      if (error) console.log("error in inserting values");
      setRants(allRants);
      setTypedRant("");
    }
  }

  return (
    <div className="p-6">
      <header className="text-lg text-slate-400 p-0 m-0 md:text-xl md:pt-2 lg:text-2xl h-20">
        Rant.io
      </header>
      <main className="p-4 flex flex-col h-[90vh] justify-between items-center">
        <section className="w-full grid grid-cols-1 md:place-items-center md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {rants &&
            rants.map((rant: Rant) => (
              <Draggable nodeRef={nodeRef} key={rant.id}>
                <Card
                  ref={nodeRef}
                  key={rant.id}
                  className="mt-4 w-full h-[200px] -z-0"
                >
                  <CardHeader ref={nodeRef} className="p-3">
                    <div>
                      <CardTitle ref={nodeRef} className="text-lg">
                        {rant.user}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1 h-[120px] overflow-hidden line-clamp-6">
                    <p className="text-sm overflow-ellipsis">{rant.rant}</p>
                  </CardContent>
                </Card>
              </Draggable>
            ))}
        </section>
        <div className="relative w-full lg:left-1/4 bottom-2">
          <Textarea
            placeholder="Rant here!"
            className="sticky bottom-2 pr-10 bg-white text-slate-900 h-32 w-full lg:w-1/2"
            value={typedRant}
            onChange={(e) => setTypedRant(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 lg:right-1/2"
            onClick={saveRants}
          >
            <Send className="w-4 h-4 cursor-pointer" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
