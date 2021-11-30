import { graphql, useFragment } from "react-relay";
import { Post_submission$key } from "./__generated__/Post_submission.graphql";

type Props = Readonly<{
  submission: Post_submission$key;
}>;
export default function Post(props: Props) {
  const submission = useFragment(
    graphql`
      fragment Post_submission on Submission {
        title
        author
        selftext {
          html
        }
      }
    `,
    props.submission
  );

  const { title, author, selftext } = submission;
  const selftextHtml = selftext?.html;

  return (
    <article>
      <h1>{title}</h1>
      <p>by /u/{author}</p>
      {selftextHtml && (
        <div dangerouslySetInnerHTML={{ __html: selftextHtml }} />
      )}
    </article>
  );
}
