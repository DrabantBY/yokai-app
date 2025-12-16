import styles from "./styles.module.scss";

type ModalProps = {
  message?: string;
};

export const Modal = ({ message = "Error" }: ModalProps) => {
  return (
    <dialog id="modal" className={styles.modalShell} open>
      <div className={styles.modalMessage}>
        {message}
        <button
          className={styles.modalAction}
          //@ts-ignore
          commandfor="modal"
          //@ts-ignore
          command="close"
          type="button"
        >
          &#x2716;
        </button>
      </div>
    </dialog>
  );
};
