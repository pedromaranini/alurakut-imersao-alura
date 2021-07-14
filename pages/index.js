import React, { useState, useEffect } from 'react';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

import MainGrid from "../src/components/MainGrid/index";
import Box from "../src/components/Box/index";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/index';

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="Foto do perfil"
        style={{ borderRadius: "8PX" }}
      />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`} >
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
        {/* Percorre oa rray, e retorna ele transformado (os mesmos itens, de forma diferente) */}
        {followers.map((itemAtual) => {
          return (
            <li key={itemAtual} >
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const githubUser = "pedromaranini";
  const [followers, setFollowers] = useState([]);
    useEffect(() => {
      fetch('https://api.github.com/users/pedromaranini/followers')
      .then((respostaDoServidor) => {
        return respostaDoServidor.json()
      })
      .then((respostaCompleta) => {
        setFollowers(respostaCompleta);
      })
    }, [])

  const [community, setComunnity] = useState([{
    id: '123123123',
    title: 'asjidajisod',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const favoritePeople = [
    "juliastefanoni",
    "diego3g",
    "omariosouto",
    "juunegreiros",
    "peas",
    "maykbrito",
  ];

  return (
    <>
      <AlurakutMenu
        githubUser={githubUser}
      />

      <MainGrid>
        {/* <Box style="grid-area: profileArea"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), Pedro
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>
            <form
              onSubmit={function handleSubmitForm(e) {
                e.preventDefault();
                // Dados do formulário
                const dataForm = new FormData(e.target);

                // Pegando os dados preenchido no campo
                const addComunity = {
                  id: newDate().toISOString(),
                  title: dataForm.get('title'),
                  image: dataForm.get('image')
                }
                // Adicionando comunidades
                const newComunnity = [...community, addComunity];
                setComunnity(newComunnity);
              }}
            >
              <div>
                <input
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  placeholder="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox 
            items={followers}
            title="Seguidores"
          />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({community.length})
            </h2>

            <ul>
              {/* Percorre oa rray, e retorna ele transformado (os mesmos itens, de forma diferente) */}
              {community.map((itemAtual) => {
                return (
                  <li key={itemAtual.id} >
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade {favoritePeople.length}
            </h2>

            <ul>
              {/* Percorre oa rray, e retorna ele transformado (os mesmos itens, de forma diferente) */}
              {favoritePeople.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
