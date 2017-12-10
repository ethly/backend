// @flow

import {
  LinkSpecification,
} from 'prod/model/LinkSpecification'

/*
 * In-memory implementation of links storage for prod server.
 */
export default class LinksStorageProd {
  linksMap: Map<string, LinkSpecification>

  constructor() {
    this.linksMap = new Map()
  }

  storeNewLinks(links: Array<LinkSpecification>): Promise<void> {
    links.forEach(link => {
      if (!this.linksMap.has(link.id)) {
        this.linksMap.set(link.id, link)
      }
    })

    return Promise.resolve()
  }

  getAllLinks(): Promise<Array<LinkSpecification>> {
    return Promise.resolve(Array.from(this.linksMap.values()))
  }

  getLink(id: string): Promise<?LinkSpecification> {
    return Promise.resolve(this.linksMap.get(id))
  }
}
