import prisma from "../../config/db";

export const createTransaction = async (payload:any) =>{
    const { amount, type, accountId, userId, zakatId, donationId, goldInventoryId, silverInventoryId, animalInventoryId, nonMonetaryAssetId } = payload
    try {
        if (!amount || !type || !accountId) {
        return  {status: false, data: 'Some impotant feilds are missing!!!' }
        }
        
       await prisma.transaction.create({
          data: {
            amount,
            type,
            account: {
              connect: { id: accountId },
            },
            user: userId ? { connect: { id: userId } } : undefined,
            zakat: zakatId ? { connect: { id: zakatId } } : undefined,
            donation: donationId ? { connect: { id: donationId } } : undefined,
            goldInventory: goldInventoryId ? { connect: { id: goldInventoryId } } : undefined,
            silverInventory: silverInventoryId ? { connect: { id: silverInventoryId } } : undefined,
            animalInventory: animalInventoryId ? { connect: { id: animalInventoryId } } : undefined,
            nonMonetaryAsset: nonMonetaryAssetId ? { connect: { id: nonMonetaryAssetId } } : undefined,
          },
        });
    
         return {status: true, data:'transaction stored!' }
      } catch (error) {
        console.error('Error creating Transaction:', error);
        return  {status: false, data: 'Unable to create transaction' }
        
      }
}