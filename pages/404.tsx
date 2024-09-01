import React from "react";
import Link from "next/link";
import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h1 style={styles.title}>404 - ページが見つかりません</h1>
        <p style={styles.description}>
          申し訳ありませんが、お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link href="/" style={styles.link}>
          ホームページに戻る
        </Link>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  main: {
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2.5rem",
    margin: "0 0 20px",
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#666",
    lineHeight: "1.6",
  },
  link: {
    fontSize: "1.1rem",
    color: "#0070f3",
    textDecoration: "none",
    border: "1px solid #0070f3",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
    display: "inline-block",
  },
};

export default Custom404;
