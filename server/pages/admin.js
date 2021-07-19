import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
// import { apiBaseUrl } from '../../react-native-app/util/apiBaseUrl';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [roasterCountry, setRoasterCountry] = useState('');
  const [origin, setOrigin] = useState('');
  const [beanType, setBeanType] = useState('');
  const [flavourProfile, setFlavourProfile] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [img, setImg] = useState('');
  const [seller, setSeller] = useState('');
  const [barcodeEan13, setBarcodeEan13] = useState('');
  const [uri, setUri] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin page</title>
        <meta name="beanify - admin" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a>Home</a>
        </Link>
        {/* <Link href="/admin">
          <a>Admin area</a>
        </Link> */}
      </header>

      <main className={styles.main}>
        <h1>Create a new product</h1>
        <form
          className={styles.form}
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(`api/products/create`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                productName,
                roaster,
                roasterCountry,
                origin,
                beanType,
                flavourProfile,
                price,
                amount,
                pricePerKg,
                img,
                seller,
                barcodeEan13,
                uri,
              }),
            });
            const data = await response.json();
            if (data.message) {
              alert(data.message);
            } else {
              alert('Oops.. something went wrong');
            }
          }}
        >
          <div>
            <div>Product name</div>
            <input
              placeholder="e.g. Mokito Verde"
              value={productName}
              onChange={(event) => {
                setProductName(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Roaster</div>
            <input
              placeholder="e.g. Mokito"
              value={roaster}
              onChange={(event) => {
                setRoaster(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Roaster country</div>
            <input
              placeholder="e.g. Italy"
              value={roasterCountry}
              onChange={(event) => {
                setRoasterCountry(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Origin</div>
            <input
              placeholder="e.g. Colombia, India, Ethiopia, Blend"
              value={origin}
              onChange={(event) => {
                setOrigin(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Bean type</div>
            <input
              placeholder="e.g. 80% Arabica - 20% Robusta"
              value={beanType}
              onChange={(event) => {
                setBeanType(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Flavour profile</div>
            <input
              placeholder="e.g. 1 (up to 65)"
              value={flavourProfile}
              onChange={(event) => {
                setFlavourProfile(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Price (in €)</div>
            <input
              placeholder="e.g. 27.90"
              value={price}
              onChange={(event) => {
                setPrice(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Amount (in kg)</div>
            <input
              placeholder="e.g. 1.00"
              value={amount}
              onChange={(event) => {
                setAmount(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Price per kg (optional)</div>
            <input
              placeholder="e.g. 27.90"
              value={pricePerKg}
              onChange={(event) => {
                setPricePerKg(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Image name (optional)</div>
            <input
              placeholder="e.g. produktbild...png"
              value={img}
              onChange={(event) => {
                setImg(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Seller (optional)</div>
            <input
              placeholder="e.g. TasteIt"
              value={seller}
              onChange={(event) => {
                setSeller(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Barcode EAN 13</div>
            <input
              placeholder="e.g. 8004413000697"
              value={barcodeEan13}
              onChange={(event) => {
                setBarcodeEan13(event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <div>Cloudinary image URL</div>
            <input
              placeholder="e.g. https://res.cloudinary.com/...png"
              value={uri}
              onChange={(event) => {
                setUri(event.currentTarget.value);
              }}
            />
          </div>
          <button>Create product</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>
          © Jakob Steininger 2021 | enabled by{' '}
          <Link href="https://upleveled.io/">
            <a>UpLeveled</a>
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
