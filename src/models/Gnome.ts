/**
 * Created by ecobos on 5/17/17.
 */
export class Gnome {
    constructor(public id: number,
                public name: string,
                public thumbnail: string,
                public age: number,
                public weight: number,
                public height: number,
                public hair_color: string,
                public professions: Array<string>,
                public friends: Array<string>
    ) { }
}