import { useEffect, useState } from 'react'
import { firestore } from '../../firebase/utils'

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([])
    
    useEffect ( () => {
        if (!collection) { return } else {
            // Collection Ref
            const collectionRef = firestore.collection(collection)
            // Take a snapshot 
            collectionRef.onSnapshot(async(collectionItems) => {
                let doc = []
                await collectionItems.forEach((item) => {
                    doc.push({id: item.id, ...item.data()})
                })
                console.table(doc)
                setDocs(doc)
            })
        }
    },[collection])

    return { docs }
}

export default useFirestore 