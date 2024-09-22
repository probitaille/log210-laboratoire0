// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import { jeuRoutes } from "../../../src/routes/jeuRouter";
import app from '../../../src/app';
import supertest from 'supertest';

const request = supertest(app);
const joueur1 = "Tata"; 
const joueur2 = "Toto";

beforeAll(async () => {
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: joueur1 });
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: joueur2 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it("Créer 2 joueurs.", async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(2);
    expect(joueursArray[0].nom).toBe(joueur1);
    expect(joueursArray[1].nom).toBe(joueur2);
  });

  it("devrait recevoir un status 200 et une réponse JSON.", async() => {
    const res = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("Aucun joueur après avoir redémarré le jeu.", async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });

  it("devrait retourne 404 (après redemarrerJeu().", async () => {
    const res = await request.get('/api/v1/jeu/jouer/');
    expect(res.status).toBe(404);
  });
});
