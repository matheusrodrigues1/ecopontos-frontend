"use client";
import { useRouter } from "next/navigation";
import styles from "../menu/style.module.css";

export default function Navbar() {
    const router = useRouter();

    return (
        <nav>
            <div className={styles.navContainer}>
                <div className={styles.navLeft}>
                    <button
                        className={styles.navHomeButton}
                        onClick={() => router.push("/mapa")}
                    >
                        🏠 Home
                    </button>
                </div>

                <div className={styles.navCenter}>
                    <div className={styles.navBrand}>
                        <div className={styles.brandTitle}>
                            <span className={styles.brandEco}>Eco</span>
                            <span className={styles.brandArapiraca}>Arapiraca</span>
                        </div>
                    </div>
                </div>

                <div className={styles.navRight} />
            </div>
        </nav>
    );
}