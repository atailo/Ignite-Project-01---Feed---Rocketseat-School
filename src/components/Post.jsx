import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function Post({ author, publishedAT, content }) {
  const publishedATDateFormatted = format(
    publishedAT,
    "dd 'de' LLLL 'de' uuuu 'às' HH'h'mm'min' ",
    { locale: ptBR }
  );

  const publishedDateRealtiveToNow = formatDistanceToNow(publishedAT, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedATDateFormatted}
          dateTime={publishedAT.toString()}
        >
          {publishedDateRealtiveToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p>{line.content}</p>;
          } else {
            return (
              <p>
                <a href={line.content.replace("👉", "")} target="_blank">
                  {line.content}
                </a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
      </div>
    </article>
  );
}
