// @flow

/**
 * Class that represents link in db. You could use linksModel to add new link
 * like this: new Link(new LinkSpecification(...)).save(...)
 */

export class LinkSpecification {
  id: string
  label: string
  url: string

  constructor(id: string, label: string, url:string) {
    this.id = id
    this.label = label
    this.url = url
  }
}
