import { fakerDE as faker } from '@faker-js/faker';
import { UserModel } from '../../../domain/model';

export const generateUser = (): UserModel => {
    return {
        id: faker.datatype.number(),
        login: faker.person.firstName()+' '+faker.person.lastName(),
        node_id: faker.datatype.uuid(),
        avatar_url: faker.image.imageUrl(),
        gravatar_id: faker.image.url(),
        url: faker.internet.url(),
        events_url: faker.internet.url(),
        followers_url: faker.internet.url(),
        following_url: faker.internet.url(),
        gists_url: faker.internet.url(),
        html_url: faker.internet.url(),
        organizations_url: faker.internet.url(),
        received_events_url: faker.internet.url(),
        repos_url: faker.internet.url(),
        site_admin: faker.datatype.boolean(),
        starred_url: faker.internet.url(),
        subscriptions_url: faker.internet.url(),
        type: 'User',
        bio: faker.person.bio(),
        blog: "",
        company: faker.company.name(),
        created_at: "",
        email: faker.internet.email(),
        followers: faker.number.int(),
        following: faker.number.int(),
        hireable: "",
        location: "",
        name: faker.person.firstName(),
        public_gists: faker.number.int(),
        public_repos: faker.number.int(),
        twitter_username: "",
        updated_at: "",
    };
}
