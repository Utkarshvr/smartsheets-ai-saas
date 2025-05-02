

// export default function page() {
//   return (
//     <main className="min-h-screen w-full flex flex-col items-center justify-center">
//       {/* <Logo /> */}
//       <p>HOME PAGE</p>
//     </main>
//   );
// }

import { redirect } from "next/navigation";

export default function page() {
  return redirect("/generate/worksheet");
}
