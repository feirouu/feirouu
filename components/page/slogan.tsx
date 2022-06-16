type Props = {
  words: string;
};

export default function Slogan({ words }: Props) {
  return (
    <aside className="container">
      <br />
      <p>{words}</p>
      <hr />
    </aside>
  );
}
