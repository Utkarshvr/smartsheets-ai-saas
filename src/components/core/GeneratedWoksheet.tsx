import ReactShowdown from "react-showdown";
import ReactMarkdown from "react-markdown";

export default function GeneratedWoksheet({
  generatedWorksheet,
}: {
  generatedWorksheet: string;
}) {
  // return <ReactMarkdown>{generatedWorksheet}</ReactMarkdown>;

  console.log({
    generatedWorksheet,

    newWorksheet: generatedWorksheet.replace(
      /^( *(\d+\. {1,4}|[\w\<\'\">\-*+])[^\n]*)\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|$)/gm,
      function (text) {
        return text.trim() + "  \n";
      }
    ),
  });
  return (
    <ReactShowdown
      markdown={generatedWorksheet.replace(
        /^( *(\d+\. {1,4}|[\w\<\'\">\-*+])[^\n]*)\n{1}(?!\n| *\d+\. {1,4}| *[-*+] +|$)/gm,
        function (text) {
          return text.trim() + "  \n";
        }
      )}
    />
  );
}
