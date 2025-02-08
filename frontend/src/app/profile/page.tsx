"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  userSkills: { __typename: string }[];
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem("FLEXHIRE_API_KEY");
    if (!apiKey) {
      router.push("/");
      return;
    }

    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/v1/graphql_proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "FLEXHIRE-API-KEY": apiKey,
        },
        body: JSON.stringify({
          query: `
            query {
              currentUser {
                id
                name
                avatarUrl
                userSkills {
                  __typename
                }
              }
            }
          `,
        }),
      });

      const data = await response.json();
      setUser(data.data.currentUser);
    };

    fetchUser();
  }, []);

  if (!user) return <p className="loading-text">Cargando...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatarUrl} alt={user.name} className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>

        <h3 className="profile-subtitle">Habilidades:</h3>
        {user.userSkills.length > 0 ? (
          <ul className="profile-skills">
            {user.userSkills.map((skill, index) => (
              <li key={index} className="profile-skill-item">
                {skill.__typename}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-skills">Sin habilidades registradas</p>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("FLEXHIRE_API_KEY");
            router.push("/");
          }}
          className="logout-button"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
