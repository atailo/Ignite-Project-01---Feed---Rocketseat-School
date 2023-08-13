import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function Post({ author, publishedAT, content }) {
  const [comments, setComments] = useState(["Post muito bacana, hein !"]);

  const [newCommentText, setnewCommentText] = useState("");

  const publishedATDateFormatted = format(
    publishedAT,
    "dd 'de' LLLL 'de' uuuu 'às' HH'h'mm'min' ",
    { locale: ptBR }
  );

  const publishedDateRealtiveToNow = formatDistanceToNow(publishedAT, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCrateNewComment() {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setnewCommentText("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity("");
    const newValue = event.target.value;

    if (!/\S/.test(newValue)) {
      event.target.setCustomValidity("Este campo é requerido");
    }
    setnewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {}

  function deleteComment(commentToDelete) {
    const commentsWhithoutDeleteOne = comments.filter((comment) => {
      return comment != commentToDelete;
    });

    setComments(commentsWhithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;
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
            return <p key={line.content}>{line.content}</p>;
          } else {
            return (
              <p key={line.content}>
                <a href={line.content.replace("👉", "")} target="_blank">
                  {line.content}
                </a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
