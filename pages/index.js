import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

import MainGrid from "../src/components/MainGrid/index";
import Box from "../src/components/Box/index";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/index';

function ProfileSideBar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.gitUser}.png`}
        alt="Foto do perfil"
        style={{ borderRadius: "8PX" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "pedromaranini";
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
      <AlurakutMenu />

      <MainGrid>
        {/* <Box style="grid-area: profileArea"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar gitUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade {favoritePeople.length}
            </h2>

            <ul>
              {/* Percorre oa rray, e retorna ele transformado (os mesmos itens, de forma diferente) */}
              {favoritePeople.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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
