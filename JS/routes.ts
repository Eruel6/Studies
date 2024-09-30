import { NOTFOUND } from 'dns';
import fs from 'fs';
import { request } from 'http';

import { Routes } from 'huncwot';
import { Created, OK, NotFound } from 'huncwot/response';
import { Interface } from 'readline';

interface Event{
  
  readonly id: number;
  name: String;
  location: String;

}

interface EventByID{
  [id: string]: Event
}

const byId = (stored: EventByID, current:Event) => ({...stored, [current.id.toString()]: current})

let EventCollection: Event[] = [
  {id: 1, name: 'Treinamento JS', location: 'Braília'},
  {id: 2, name: 'Evento Metodologia Agile', location: 'São Paulo'}
]

class EventRepositorie{

  static currentID = 3;

  static create(name: string, location: string){
    const event = {id: this.currentID++, name, location}
    EventCollection.push(event);

    return event;
  }

  static destroy (id: string){
    EventCollection = EventCollection.filter(element => element.id.toString() != id)
  }

  static update (id: string, name: string){
    const event = EventCollection.reduce(byId, {})[id];
    event.name = name;
    return event;
  }

  static browse(){
    return EventCollection;
  }

  static fetch(id: string){
    return EventCollection.reduce(byId,{})[id];
  }

}

const routes: Routes = {
  GET: {
    '/event/:id': ({params}) => {
      
      const event = EventRepositorie.fetch(params.id); 

      return event ? OK(event) : NotFound();
    },
    '/event': () =>{
      const collection = EventRepositorie.browse();
      return OK(collection);
    }
    
  },
  POST: {
    '/event': ({params}) => {
      const {name, location} = params;
      const event = EventRepositorie.create(name, location);

      return Created(event);
    }
  },
  PUT:{
    '/event/:id': ({params: {id,name}}) => {
      const event = EventRepositorie.update(id,name);

      return OK(event)
    }
  },
  DELETE: {
    '/event/:id': ({params}) =>{
      EventRepositorie.destroy(params.id);
      return OK();
    }
  }
};

export default routes;
