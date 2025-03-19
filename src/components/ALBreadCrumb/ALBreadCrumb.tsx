import React from 'react'
import { BreadCrumb } from 'primereact/breadcrumb'

interface BreadcrumbItem {
  label: string
  url: string
}

interface ALBreadCrumbComponentProps {
  breadcrumbItems: BreadcrumbItem[]
}

const ALBreadCrumb: React.FC<ALBreadCrumbComponentProps> = ({ breadcrumbItems }: ALBreadCrumbComponentProps) => {
  return (
    <BreadCrumb
      model={[...breadcrumbItems].map((item) => ({
        label: item.label,
        url: item.url,
      }))}
      home={{ icon: 'pi pi-home', url: '/' }}
      style={{ justifyContent: 'flex-start', marginLeft: '1rem' }}
    />
  )
}

export default ALBreadCrumb
