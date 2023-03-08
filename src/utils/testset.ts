export interface card {
    term: string;
    definition: string;
}

export interface set {
    title: string;
    slug: string;
    cards: card[];
}

export interface TestSet {
    userid: string;
    username: string;
    sets: set[];
}

export const testset: TestSet = {
    userid: '1',
    username: 'admin',
    sets: [
        {
            title: 'APUSH Vocab',
            slug: 'apush-vocab',
            cards: [
                {
                    term: 'Political Machine',
                    definition: 'Warrens for parts of cities',
                },
                {
                    term: 'Williams v. Mississippi',
                    definition:
                        'An 1898 Supreme Court ruling that allowed states to impose poll taxes and literacy tests. By 1908, every southern state had adopted such measures',
                },
                {
                    term: 'Social Deposit',
                    definition:
                        'A movement in the late 1800s / early 1900s which emphasized charity and social responsibility as a means of salvation.',
                },
                {
                    term: 'Naturalism',
                    definition:
                        'A nineteenth-century literary movement that was an extension of realism and that claimed to portray life exactly as it was.',
                },
                {
                    term: 'American Federation of Labor',
                    definition:
                        '1886; founded by Samuel Gompers; sought better wages, hrs, working conditions; skilled laborers, arose out of dissatisfaction with the Knights of Labor, rejected socialist and communist ideas, non-violent.',
                },
                {
                    term: 'Progressiveness',
                    definition:
                        'The movement in the late 1800s to increase democracy in America by curbing the power of the corporation. It fought to end corruption in government and business, and worked to bring equal rights of women and other groups that had been left behind during the industrial revolution.',
                },
                {
                    term: 'New Nationalism',
                    definition:
                        "Roosevelt's progressive political policy that favored heavy government intervention in order to assure social justice",
                },
                {
                    term: 'Vertical Integration',
                    definition:
                        'Practice where a single entity controls the entire process of a product, from the raw materials to distribution',
                },
                {
                    term: 'Ragtime',
                    definition:
                        'A type of music featuring melodies with shifting accents over a steady, marching-band beat; originated among black musicians in the south and midwest in the 1880s',
                },
                {
                    term: 'Gilded Age',
                    definition:
                        '1870s - 1890s; time period looked good on the outside, despite the corrupt politics & growing gap between the rich & poor',
                },
                {
                    term: 'Realism',
                    definition:
                        'A 19th century artistic movement in which writers and painters sought to show life as it is rather than life as it should be',
                },
                {
                    term: 'Lochner v New York',
                    definition:
                        '(1905) This supreme court case debated whether or not New York state violated the liberty of the fourteenth amendment which allowed Lochner to regulate his business when he made a contract. The specific contract Lochner made violated the New York statute which stated that bakers could not work more than 60 hours per week, and more than 10 hours per day. Ultimately, it was ruled that the New York State law was invalid, and interfered with the freedom of contract.',
                },
                {
                    term: 'Horizontal Integration',
                    definition:
                        'Absorption into a single firm of several firms involved in the same level of production and sharing resources at that level',
                },
                {
                    term: 'Fundamentalism',
                    definition:
                        'Literal interpretation and strict adherence to basic principles of a religion (or a religious branch, denomination, or sect).',
                },
                {
                    term: 'Knights of Labor',
                    definition:
                        '1st effort to create National union. Open to everyone but lawyers and bankers. Vague program, no clear goals, weak leadership and organization. Failed',
                },
            ],
        },
    ],
};
