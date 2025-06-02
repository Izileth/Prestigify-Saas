'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatData } from '@/utils/format-current';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { Donation } from '@/generated/prisma';
import { Skeleton } from '@/components/ui/skeleton';

interface ReponseDonation {
    data: Donation[]
}

export function DonationTable() {

    const {data, isLoading} = useQuery({

        queryKey: ['donations'],
        queryFn: async () =>{
            const response = `${process.env.NEXT_PUBLIC_HOST_URL}/api/payments`

            const responseUrl = await fetch(response)
            const json = await responseUrl.json() as  ReponseDonation;
        
            if(!responseUrl.ok){
                return []
            }

            return json.data
        },
        refetchInterval: 20000
    })

    if(isLoading){
        return (
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-8" />
            </div>
        )
    }

    return (
        <>
        {/* Desktop Version */}
        <div className="hidden lg:block">
            <Table className="border border-gray-200">
            <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                <TableHead className="font-normal text-gray-600 py-3 px-4">Doador</TableHead>
                <TableHead className="font-normal text-gray-600 py-3 px-4">Mensagem</TableHead>
                <TableHead className="font-normal text-gray-600 py-3 px-4 text-center">Valor</TableHead>
                <TableHead className="font-normal text-gray-600 py-3 px-4 text-center">Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.map((donation) => (
                <TableRow 
                    key={donation.id} 
                    className="border-b border-gray-100 hover:bg-gray-50"
                >
                    <TableCell className="font-normal text-gray-800 py-3 px-4">
                    {donation.donorName}
                    </TableCell>
                    <TableCell className="text-gray-600 py-3 px-4 max-w-[300px] truncate">
                    {donation.donorMessage || '-'}
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-800 py-3 px-4">
                    {formatCurrency(donation.amount / 100)}
                    </TableCell>
                    <TableCell className="text-center text-gray-600 py-3 px-4">
                    {formatData(donation.cratedAt)}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-3">
            {data && data.map((donation) => (
            <Card 
                key={donation.id} 
                className="border border-gray-200 rounded-none shadow-none"
            >
                <CardHeader className="py-3 px-4 border-b border-gray-100">
                <CardTitle className="text-base font-medium text-gray-800">
                    {donation.donorName}
                </CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4">
                <p className="text-sm text-gray-600 mb-3 min-h-[40px]">
                    {donation.donorMessage || '-'}
                </p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                    <span className="font-medium text-gray-800">
                    {formatCurrency(donation.amount / 100)}
                    </span>
                    <span className="text-sm text-gray-600">
                    {formatData(donation.cratedAt)}
                    </span>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        </>
    )
}