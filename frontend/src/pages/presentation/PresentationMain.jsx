import React from 'react'
import 'components/Presentation/Presentation.css'
import Prepare from 'components/Presentation/Prepare'
import { presentationListState } from 'store/PresentationStates'
import { useRecoilValue } from 'recoil'
import ActiveList from 'components/Presentation/ActiveList'

function PresentationMain() {
  const presentationList = useRecoilValue(presentationListState)

  return (
    <div className='PresentationContainer'>
      {presentationList.length > 0 ? <ActiveList /> : <Prepare />}
    </div>
  )
}

export default PresentationMain
