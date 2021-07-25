import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [enableWasm, setEnableWasm] = useState(false);
  const [origImg, setOrigImg] = useState(null);
  const [resImg, setResImg] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vercel Wasm Runtime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/WasmEdge/WasmEdge">WasmEdge!</a>
        </h1>

        <div className={styles.operating}>
          <div>
            <input type="file" id="fileElem" accept="image/png" className={styles['visually-hidden']} onChange={fileSelected} />
            <label htmlFor="fileElem" className={styles.noselect}>Select an image</label>
            <div className={styles.thumb}>
              {origImg && <img src={origImg.src} />}
            </div>
          </div>
          <div>
            <button id="runBtn" onClick={runWasm} disabled={!enableWasm || loading}>{loading ? 'Loading' : 'Run Wasm'}</button>
            <div className={styles.thumb}>
              {resImg && <img src={resImg.src} />}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );

  function fileSelected(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/png')) {
      alert('Please select a png image.');
      return;
    }

    const img = document.createElement('img');
    img.file = file

    const reader = new FileReader();
    reader.onload = (function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
        setOrigImg(aImg);
        setEnableWasm(true);
      };
    })(img);
    reader.readAsDataURL(file);
  }

  function runWasm(e) {
    const img = document.createElement('img');

    const reader = new FileReader();
    reader.onload = function(e) {
      setLoading(true);
      var oReq = new XMLHttpRequest();
      oReq.open("POST", '/api/hello', true);
      oReq.setRequestHeader('image-type', origImg.file.type);
      oReq.responseType = 'blob';
      oReq.onload = (function(bImg) {
        return function (oEvent) {
          setLoading(false);
          bImg.src = URL.createObjectURL(oReq.response);
          setResImg(bImg);
          URL.revokeObjectURL(oReq.response);
        };
      })(img);
      const blob = new Blob([e.target.result], {type: 'application/octet-stream'});
      oReq.send(blob);
    };
    reader.readAsArrayBuffer(origImg.file);
  }
}
