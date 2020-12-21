import { useSelector } from 'react-redux'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const useAuth = props => {
    const { currentUser } = useSeector(mapState)

    return currentUser
}

export default useAuth