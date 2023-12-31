import { useEffect, useState } from "react"

const useVisitor = email => {
    const [isVisitor, setIsVisitor] = useState(false);
    const [isVisitorLoading, setIsVisitorLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://99-pro-shop-server.vercel.app/users/visitor/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsVisitor(data.isVisitor);
                    setIsVisitorLoading(false);
                })
        }
    }, [email])
    return [isVisitor, isVisitorLoading]
}

export default useVisitor;