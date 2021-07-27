import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Mailto = ({ email, subject = '', body = '', children }) => {
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to beanify - your world of coffee</title>
        <meta
          name="beanify - your coffee bean explorer in Vienna"
          content="beanify is an application to find, rate and store your favourite coffee beans in Vienna"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </header>

      <main className={styles.main}>
        <Image
          src="/cover.png"
          alt=""
          width={600}
          height={240}
          className={styles.logo}
        />
        <h1 className={styles.title}>
          Welcome to beanify - your world of coffee
        </h1>
        <p className={styles.text}>
          <b>Android: </b>
          Download{' '}
          <Link href="https://expo.dev/tools">
            <a>
              --{'>'} Expo Go {'<'}--
            </a>
          </Link>{' '}
          on your device and scan the QR code on{' '}
          <Link href="https://expo.io/@steiningerjakob/beanify?release-channel=prod-v1">
            <a>
              --{'>'} my Expo project page {'<'}--
            </a>
          </Link>
        </p>
        <p className={styles.text}>
          <b>iOS: </b>
          Click{' '}
          <Mailto
            email="contact@steiningerjakob.me"
            subject="Requesting access to beanify beta-test version"
            body="Hello Jakob,
            please give me access to the beanify beta-test version.
            Cheers"
          >
            --{'>'} here {'<'}--
          </Mailto>{' '}
          to request your personal link to the Apple TestFlight beta version of
          my app
        </p>
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
