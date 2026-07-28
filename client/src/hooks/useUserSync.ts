import {useAuth, useUser} from '@clerk/react'
import {useMutation} from '@tanstack/react-query'
import {useEffect} from 'react'
import {syncUser} from '../lib/api'

const useUserSync = () => {
    const {isSignedIn} = useAuth();
    const {user} = useUser();

    const {mutate:syncUserMutation, isPending, isSuccess, isError} = useMutation({
        mutationFn:syncUser,
    });

    useEffect(()=>{

        if(isSignedIn && user && !isPending && !isSuccess && !isError){
            syncUserMutation({
                email: user.primaryEmailAddress?.emailAddress as string,
                name: user.fullName || user.username,
                imageUrl: user.imageUrl
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isPending, isSignedIn, isSuccess, user, isError])
  return {
    isSinced: isSuccess
  }
}

export default useUserSync