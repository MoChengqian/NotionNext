import BLOG from '@/blog.config'

const normalizeId = id => String(id || '').replace(/-/g, '')

export default function getAllPageIds(
  collectionQuery,
  collectionId,
  collectionView,
  viewIds
) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  let pageIds = []
  try {
    // Notion数据库中的第几个视图用于站点展示和排序：
    const groupIndex = BLOG.NOTION_INDEX || 0
    const collectionEntry =
      collectionQuery?.[collectionId] ||
      collectionQuery?.[normalizeId(collectionId)] ||
      null

    if (collectionEntry && Array.isArray(viewIds) && viewIds.length > 0) {
      const preferredViewId = viewIds[groupIndex]
      const preferredView =
        collectionEntry?.[preferredViewId] ||
        collectionEntry?.[normalizeId(preferredViewId)]

      const ids =
        preferredView?.collection_group_results?.blockIds ||
        preferredView?.blockIds ||
        []

      for (const id of ids) {
        pageIds.push(id)
      }
    }

    if (pageIds.length === 0 && collectionEntry) {
      Object.values(collectionEntry).forEach(view => {
        view?.blockIds?.forEach(id => pageIds.push(id))
        view?.collection_group_results?.blockIds?.forEach(id =>
          pageIds.push(id)
        )
      })
    }

    if (pageIds.length === 0 && collectionQuery) {
      Object.values(collectionQuery).forEach(collection => {
        Object.values(collection || {}).forEach(view => {
          view?.blockIds?.forEach(id => pageIds.push(id))
          view?.collection_group_results?.blockIds?.forEach(id =>
            pageIds.push(id)
          )
        })
      })
    }
  } catch (error) {
    console.error(
      'Error fetching page IDs:',
      {
        collectionId,
        viewIds,
        pageIdsLength: pageIds.length
      },
      error
    )
    return []
  }

  if (pageIds.length === 0 && collectionQuery && Object.values(collectionQuery).length > 0) {
    const pageSet = new Set()
    const collectionEntry =
      collectionQuery?.[collectionId] ||
      collectionQuery?.[normalizeId(collectionId)] ||
      null
    const views = collectionEntry
      ? Object.values(collectionEntry)
      : Object.values(collectionQuery).flatMap(collection =>
          Object.values(collection || {})
        )

    views.forEach(view => {
      view?.blockIds?.forEach(id => pageSet.add(id))
      view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id))
    })
    pageIds = [...pageSet]
  }

  return [...new Set(pageIds)]
}
